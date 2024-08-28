import * as fs from "fs";
import * as path from "path";

type Address = string;

type TokenDetails = {
  decimals: number;
  name: string;
  symbol: string;
};

type TokenCache = Record<Address, TokenDetails>;

export class Cache {
  private static instances: Record<number, Cache> = {};
  private memory: TokenCache = {};

  private static encoding = "utf8" as const;
  private static folder = "./.cache" as const;

  private constructor(private chainId: number) {
    this.preflight();
    this.load();
  }

  public static getInstance(chainId: number): Cache {
    if (!Cache.instances[chainId]) {
      Cache.instances[chainId] = new Cache(chainId);
    }
    return Cache.instances[chainId];
  }

  public read(address: string): TokenDetails | undefined {
    return this.memory[address.toLowerCase()];
  }

  public add(address: string, details: TokenDetails): void {
    this.memory[address.toLowerCase()] = details;
    this.publish();
  }

  private load() {
    try {
      const data = fs.readFileSync(this.getFilePath(), Cache.encoding);
      this.memory = JSON.parse(data) as TokenCache;
    } catch (error) {
      console.error(`Error loading cache for chain ${this.chainId}:`, error);
      this.memory = {};
    }
  }

  private preflight() {
    if (!fs.existsSync(Cache.folder)) {
      fs.mkdirSync(Cache.folder);
    }
    if (!fs.existsSync(this.getFilePath())) {
      fs.writeFileSync(this.getFilePath(), JSON.stringify({}));
    }
  }

  private publish() {
    const prepared = JSON.stringify(this.memory);
    try {
      fs.writeFileSync(this.getFilePath(), prepared);
    } catch (error) {
      console.error(`Error writing cache for chain ${this.chainId}:`, error);
    }
  }

  private getFilePath(): string {
    return path.join(Cache.folder, `token-${this.chainId}.json`);
  }
}
