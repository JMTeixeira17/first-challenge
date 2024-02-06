import { Buffer } from 'buffer'
import * as process from 'process'


(window as any).global = window;
(window as any).global.buffer = Buffer;
(window as any).process = process;

