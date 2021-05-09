import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { BnetService } from "./bnet.service";


@Module({
  imports: [
    ConfigModule
  ],
  controllers: [],
  providers: [BnetService],
  exports: [BnetService]
})
export class BnetModule { }