import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
//import { xai } from '@ai-sdk/xai';
import { google } from "@ai-sdk/google"
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': google("models/gemini-2.0-flash"),
        //xai('grok-2-1212')
        'chat-model-reasoning': wrapLanguageModel({
          model: google("gemini-2.0-flash-thinking-exp-01-21"),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': google("models/gemini-2.0-flash"),
        'artifact-model': google("models/gemini-2.0-flash"),
      },
      
      imageModels: {
        'small-model': {
          ...google("gemini-2.0-flash-exp-image-generation"),
          maxImagesPerCall: 4 // ← WAJIB tambahkan ini
        }
        //xai.image('grok-2-image')
      },
    });

