import { Module, ModuleMetadata } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheConfigService } from 'server/cache-config.service';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { BlockedVideo, BlockedVideoSchema } from './schemas/blocked-video';
import { UserModule } from '../user/user.module';

const moduleMetadata: ModuleMetadata = {
  imports: [
    ConfigModule.forRoot(),
    CacheModule.registerAsync({
      useClass: CacheConfigService
    }),
    MongooseModule.forFeature([
      {
        name: BlockedVideo.name,
        schema: BlockedVideoSchema,
        collection: 'blocked-videos'
      }
    ]),
    UserModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
};
@Module(moduleMetadata)
export class AdminModule {}
