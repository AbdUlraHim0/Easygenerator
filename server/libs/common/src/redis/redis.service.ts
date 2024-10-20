import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);

  private redisClient: Redis;

  onModuleInit() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST || 'redis',
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    });
  }

  onModuleDestroy() {
    return this.redisClient.quit();
  }

  getClient(): Redis {
    return this.redisClient;
  }

  async setKey(key: string, value: string): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async getKey(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async deleteKey(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
