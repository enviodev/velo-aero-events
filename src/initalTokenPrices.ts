import fs from "fs/promises";
import path from "path";
import { Token_Price } from "generated";

export async function initializeTokenPrices(context: any) {
  context.log.info("Starting initializeTokenPrices function");
  const csvFiles = ["base_prices_1723784400", "op_prices_1723784400"];

  for (const file of csvFiles) {
    context.log.info(`Processing file: ${file}`);
    const chainId = file.startsWith("base") ? 8453 : 10; // 8453 for Base, 10 for Optimism

    try {
      const filePath = path.join(__dirname, "..", ".cache", `${file}.csv`);
      const csvContent = await fs.readFile(filePath, "utf-8");

      context.log.info(`CSV content length: ${csvContent.length}`);
      const lines = csvContent.split("\n");
      context.log.info(`Number of lines: ${lines.length}`);
      const headers = lines[0].split(",");
      context.log.info(`Number of headers: ${headers.length}`);

      let tokenPricesAdded = 0;

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.length === 0) continue;

        const values = line.split(",");
        const timestamp = values[0];

        for (let j = 1; j < headers.length; j++) {
          const tokenAddress = headers[j];
          const price = values[j];

          if (price && price !== "") {
            const tokenPrice: Token_Price = {
              id: `${chainId}-${tokenAddress}-${timestamp}`,
              timestamp: new Date(parseInt(timestamp) * 1000),
              chainId: chainId,
              tokenAddress: tokenAddress,
              price: parseFloat(price),
            };

            context.Token_Price.set(tokenPrice);
            tokenPricesAdded++;
          }
        }
      }

      context.log.info(
        `Total token prices added for ${file}: ${tokenPricesAdded}`
      );
    } catch (error) {
      context.log.error(`Error processing file`);
    }
  }
  context.log.info("Finished initializeTokenPrices function");
}
