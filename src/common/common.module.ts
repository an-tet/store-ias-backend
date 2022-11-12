import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/exios.adapter';

@Module({
  providers: [AxiosAdapter],
  exports: [AxiosAdapter],
})
export class CommonModule {}
