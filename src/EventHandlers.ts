import { indexer } from "envio";
/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import { CLFactory_PoolCreated, Voter_GaugeCreated, PoolFactory_PoolCreated, PoolFactory_SetCustomFee, Pool, Pool_Sync, Pool_Swap, BribeVotingReward, BribeVotingReward_Deposit, BribeVotingReward_NotifyReward, BribeVotingReward_Withdraw, Gauge, Gauge_NotifyReward, Token } from "envio";

import { getErc20TokenDetails } from "./erc20";

indexer.onEvent(
  { contract: "CLFactory", event: "PoolCreated" },
  async ({ event, context }) => {
  const entity: CLFactory_PoolCreated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    token0: event.params.token0,
    token1: event.params.token1,
    tickSpacing: event.params.tickSpacing,
    pool: event.params.pool,
    timestamp: new Date(event.block.timestamp * 1000), // Convert to Date
  };

  context.CLFactory_PoolCreated.set(entity);

  // Fetch and save token details
  await saveTokenDetails(event.params.token0, event.chainId, context);
  await saveTokenDetails(event.params.token1, event.chainId, context);
}
);

indexer.contractRegister(
  { contract: "Voter", event: "GaugeCreated" },
  ({ event, context }) => {
  context.chain.BribeVotingReward.add(event.params.bribeVotingReward);
  context.chain.Gauge.add(event.params.gauge);
}
);

indexer.onEvent(
  { contract: "Voter", event: "GaugeCreated" },
  async ({ event, context }) => {
  const entity: Voter_GaugeCreated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    poolFactory: event.params.poolFactory,
    votingRewardsFactory: event.params.votingRewardsFactory,
    gaugeFactory: event.params.gaugeFactory,
    pool: event.params.pool,
    bribeVotingReward: event.params.bribeVotingReward,
    feeVotingReward: event.params.feeVotingReward,
    gauge: event.params.gauge,
    creator: event.params.creator,
    timestamp: new Date(event.block.timestamp * 1000), // Convert to Date
  };

  context.Voter_GaugeCreated.set(entity);
}
);

indexer.contractRegister(
  { contract: "PoolFactory", event: "PoolCreated" },
  ({ event, context }) => {
  context.chain.Pool.add(event.params.pool);
}
);

indexer.onEvent(
  { contract: "PoolFactory", event: "PoolCreated" },
  async ({ event, context }) => {
  const entity: PoolFactory_PoolCreated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    token0: event.params.token0,
    token1: event.params.token1,
    stable: event.params.stable,
    pool: event.params.pool,
    unnamed: event.params.unnamed,
    timestamp: new Date(event.block.timestamp * 1000), // Convert to Date
  };

  context.PoolFactory_PoolCreated.set(entity);

  // Fetch and save token details
  await saveTokenDetails(event.params.token0, event.chainId, context);
  await saveTokenDetails(event.params.token1, event.chainId, context);
}
);

indexer.onEvent(
  { contract: "PoolFactory", event: "SetCustomFee" },
  async ({ event, context }) => {
  const entity: PoolFactory_SetCustomFee = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    pool: event.params.pool,
    fee: event.params.fee,
    timestamp: new Date(event.block.timestamp * 1000), // Convert to Date
  };

  context.PoolFactory_SetCustomFee.set(entity);
}
);

indexer.onEvent(
  { contract: "Pool", event: "Sync" },
  async ({ event, context }) => {
  const entity: Pool_Sync = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    reserve0: event.params.reserve0,
    reserve1: event.params.reserve1,
    sourceAddress: event.srcAddress,
    timestamp: new Date(event.block.timestamp * 1000), // Convert to Date
  };

  context.Pool_Sync.set(entity);
}
);

indexer.onEvent(
  { contract: "Pool", event: "Swap" },
  async ({ event, context }) => {
  const entity: Pool_Swap = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    sender: event.params.sender,
    to: event.params.to,
    amount0In: event.params.amount0In,
    amount1In: event.params.amount1In,
    amount0Out: event.params.amount0Out,
    amount1Out: event.params.amount1Out,
    sourceAddress: event.srcAddress, // Add sourceAddress
    timestamp: new Date(event.block.timestamp * 1000), // Convert to Date
  };

  context.Pool_Swap.set(entity);
}
);

indexer.onEvent(
  { contract: "BribeVotingReward", event: "Deposit" },
  async ({ event, context }) => {
  const entity: BribeVotingReward_Deposit = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    tokenId: event.params.tokenId,
    amount: event.params.amount,
    timestamp: new Date(event.block.timestamp * 1000), // Convert to Date
    sourceAddress: event.srcAddress,
  };

  context.BribeVotingReward_Deposit.set(entity);
}
);

indexer.onEvent(
  { contract: "BribeVotingReward", event: "NotifyReward" },
  async ({ event, context }) => {
  const entity: BribeVotingReward_NotifyReward = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    reward: event.params.reward,
    epoch: event.params.epoch,
    amount: event.params.amount,
    timestamp: new Date(event.block.timestamp * 1000), // Convert to Date
    sourceAddress: event.srcAddress,
  };

  context.BribeVotingReward_NotifyReward.set(entity);
}
);

indexer.onEvent(
  { contract: "BribeVotingReward", event: "Withdraw" },
  async ({ event, context }) => {
  const entity: BribeVotingReward_Withdraw = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    tokenId: event.params.tokenId,
    amount: event.params.amount,
    timestamp: new Date(event.block.timestamp * 1000), // Convert to Date
    sourceAddress: event.srcAddress,
  };

  context.BribeVotingReward_Withdraw.set(entity);
}
);

indexer.onEvent(
  { contract: "Gauge", event: "NotifyReward" },
  async ({ event, context }) => {
  const entity: Gauge_NotifyReward = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    amount: event.params.amount,
    timestamp: new Date(event.block.timestamp * 1000), // Convert to Date
    sourceAddress: event.srcAddress,
  };

  context.Gauge_NotifyReward.set(entity);
}
);

async function saveTokenDetails(
  address: string,
  context: any
) {
  try {
    const tokenDetails = await getErc20TokenDetails(address, chainId);
    const token: Token = {
      id: `${chainId}-${address}`,
      symbol: tokenDetails.symbol,
      name: tokenDetails.name,
      chainID: BigInt(chainId),
      decimals: BigInt(tokenDetails.decimals),
    };
    context.Token.set(token);
  } catch (error) {
    console.error(`Error fetching token details for ${address}:`, error);
  }
}
