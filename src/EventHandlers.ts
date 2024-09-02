/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  CLFactory,
  CLFactory_PoolCreated,
  Voter,
  Voter_GaugeCreated,
  PoolFactory,
  PoolFactory_PoolCreated,
  PoolFactory_SetCustomFee,
  Pool,
  Pool_Sync,
  BribeVotingReward,
  BribeVotingReward_Deposit,
  BribeVotingReward_NotifyReward,
  BribeVotingReward_Withdraw,
  Gauge,
  Gauge_NotifyReward,
  Token,
} from "generated";

import { getErc20TokenDetails } from "./erc20";

CLFactory.PoolCreated.handler(async ({ event, context }) => {
  const entity: CLFactory_PoolCreated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    token0: event.params.token0,
    token1: event.params.token1,
    tickSpacing: event.params.tickSpacing,
    pool: event.params.pool,
    timestamp: new Date(event.block.timestamp * 1000), // Convert to Date
    chainId: event.chainId,
  };

  context.CLFactory_PoolCreated.set(entity);

  // Fetch and save token details
  await saveTokenDetails(event.params.token0, event.chainId, context);
  await saveTokenDetails(event.params.token1, event.chainId, context);
});

Voter.GaugeCreated.contractRegister(({ event, context }) => {
  context.addBribeVotingReward(event.params.bribeVotingReward);
  context.addGauge(event.params.gauge);
});

Voter.GaugeCreated.handler(async ({ event, context }) => {
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
    chainId: event.chainId,
  };

  context.Voter_GaugeCreated.set(entity);
});

PoolFactory.PoolCreated.contractRegister(({ event, context }) => {
  context.addPool(event.params.pool);
});

PoolFactory.PoolCreated.handler(async ({ event, context }) => {
  const entity: PoolFactory_PoolCreated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    token0: event.params.token0,
    token1: event.params.token1,
    stable: event.params.stable,
    pool: event.params.pool,
    unnamed: event.params.unnamed,
    timestamp: new Date(event.block.timestamp * 1000), // Convert to Date
    chainId: event.chainId,
  };

  context.PoolFactory_PoolCreated.set(entity);

  // Fetch and save token details
  await saveTokenDetails(event.params.token0, event.chainId, context);
  await saveTokenDetails(event.params.token1, event.chainId, context);
});

PoolFactory.SetCustomFee.handler(async ({ event, context }) => {
  const entity: PoolFactory_SetCustomFee = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    pool: event.params.pool,
    fee: event.params.fee,
    timestamp: new Date(event.block.timestamp * 1000), // Convert to Date
    chainId: event.chainId,
  };

  context.PoolFactory_SetCustomFee.set(entity);
});

Pool.Sync.handler(async ({ event, context }) => {
  const entity: Pool_Sync = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    reserve0: event.params.reserve0,
    reserve1: event.params.reserve1,
    sourceAddress: event.srcAddress,
    timestamp: new Date(event.block.timestamp * 1000), // Convert to Date
    chainId: event.chainId,
  };

  context.Pool_Sync.set(entity);
});

BribeVotingReward.Deposit.handler(async ({ event, context }) => {
  const entity: BribeVotingReward_Deposit = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    tokenId: event.params.tokenId,
    amount: event.params.amount,
    timestamp: new Date(event.block.timestamp * 1000), // Convert to Date
    sourceAddress: event.srcAddress,
    chainId: event.chainId,
  };

  context.BribeVotingReward_Deposit.set(entity);
});

BribeVotingReward.NotifyReward.handler(async ({ event, context }) => {
  const entity: BribeVotingReward_NotifyReward = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    reward: event.params.reward,
    epoch: event.params.epoch,
    amount: event.params.amount,
    timestamp: new Date(event.block.timestamp * 1000), // Convert to Date
    sourceAddress: event.srcAddress,
    chainId: event.chainId,
  };

  context.BribeVotingReward_NotifyReward.set(entity);
});

BribeVotingReward.Withdraw.handler(async ({ event, context }) => {
  const entity: BribeVotingReward_Withdraw = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    tokenId: event.params.tokenId,
    amount: event.params.amount,
    timestamp: new Date(event.block.timestamp * 1000), // Convert to Date
    sourceAddress: event.srcAddress,
    chainId: event.chainId,
  };

  context.BribeVotingReward_Withdraw.set(entity);
});

Gauge.NotifyReward.handler(async ({ event, context }) => {
  const entity: Gauge_NotifyReward = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    amount: event.params.amount,
    timestamp: new Date(event.block.timestamp * 1000), // Convert to Date
    sourceAddress: event.srcAddress,
    chainId: event.chainId,
  };

  context.Gauge_NotifyReward.set(entity);
});

async function saveTokenDetails(
  address: string,
  chainId: number,
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
