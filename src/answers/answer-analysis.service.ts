import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import * as fs from 'fs';
import { IamAuthenticator } from 'ibm-watson/auth';
import * as mp3Duration from 'mp3-duration';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');

import { FillerWords } from '../enums/filler-words.enum';
import { Answer } from './answer.entity';

@Injectable()
export class AnswerAnalysisService {
  async audioAnalysis(audioFilePath: string): Promise<Answer> {
    const answer = new Answer();

    const time = await mp3Duration(audioFilePath, (err, duration) => {
      if (err)
        throw new ServiceUnavailableException(
          `mp3Duration error, error: ${err} `,
        );
      return duration;
    });

    answer.answerText = await this.transcribeAudio(audioFilePath);

    answer.totalWords = answer.answerText.split(' ').length;

    answer.wpm = Math.round(answer.totalWords / (time / 60));

    answer.repeatedWords = this.countRepeatedWords(answer.answerText);

    answer.fillerWords = answer.repeatedWords.filter((repeatedWord) =>
      (<any>Object).values(FillerWords).includes(repeatedWord),
    );

    answer.time = Math.round(time);

    return answer;
  }

  private async transcribeAudio(audioFilePath: string): Promise<string> {
    const speechToText = new SpeechToTextV1({
      authenticator: new IamAuthenticator({
        apikey: 'nghqb0v6sPfo3n5TX9dPvB9XHyV7c2CafrOpFgGCIomA',
      }),
      serviceUrl:
        'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/ebdb9470-0a7a-4be1-9760-176339e08f2c',
    });

    const params = {
      audio: fs.createReadStream(audioFilePath),
      contentType: 'audio/mp3',
    };

    const transcript = await speechToText
      .recognize(params)
      .then((response) => {
        return response.result.results[0].alternatives[0].transcript;
      })
      .catch((err) => {
        throw new ServiceUnavailableException(
          `IBM Speech to text error, error: ${err} `,
        );
      });

    return transcript;
  }

  private countRepeatedWords(answerText: string): string[] {
    const punctuationFreeText = answerText
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .toLowerCase();

    const words = punctuationFreeText.split(' ');
    const wordMap = {};

    for (let i = 0; i < words.length; i++) {
      const currentWordCount = wordMap[words[i]];
      const count = currentWordCount ? currentWordCount : 0;
      wordMap[words[i]] = count + 1;
    }

    const repeatedWords = [];

    for (const [key, value] of Object.entries(wordMap)) {
      if (
        value > 5 &&
        key !== 'a' &&
        key !== 'an' &&
        key !== 'i' &&
        key !== 'the' &&
        key !== 'and'
      ) {
        repeatedWords.push(key);
      }
    }

    return repeatedWords;
  }
}
