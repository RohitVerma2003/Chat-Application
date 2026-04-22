import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisConfig = {
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-15973.crce292.ap-south-1-2.ec2.cloud.redislabs.com',
        port: 15973,
    }
}

export const client = createClient(redisConfig);
export const publisher = createClient(redisConfig);
export const subscriber = createClient(redisConfig);

client.on('error', err => console.log('Redis Client Error', err));
publisher.on('error', err => console.log('Publisher Client Error', err));
subscriber.on('error', err => console.log('Subscriber Client Error', err));

await client.connect();
await publisher.connect();
await subscriber.connect();

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar