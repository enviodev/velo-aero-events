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
} from "generated";

CLFactory.PoolCreated.handler(async ({ event, context }) => {
  const entity: CLFactory_PoolCreated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    token0: event.params.token0,
    token1: event.params.token1,
    tickSpacing: event.params.tickSpacing,
    pool: event.params.pool,
  };

  context.CLFactory_PoolCreated.set(entity);
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
  };

  context.PoolFactory_PoolCreated.set(entity);
});

PoolFactory.SetCustomFee.handler(async ({ event, context }) => {
  const entity: PoolFactory_SetCustomFee = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    pool: event.params.pool,
    fee: event.params.fee,
  };

  context.PoolFactory_SetCustomFee.set(entity);
});

Pool.Sync.handler(async ({ event, context }) => {
  const entity: Pool_Sync = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    reserve0: event.params.reserve0,
    reserve1: event.params.reserve1,
  };

  context.Pool_Sync.set(entity);
});

BribeVotingReward.Deposit.handler(async ({ event, context }) => {
  const entity: BribeVotingReward_Deposit = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    tokenId: event.params.tokenId,
    amount: event.params.amount,
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
  };

  context.BribeVotingReward_NotifyReward.set(entity);
});

BribeVotingReward.Withdraw.handler(async ({ event, context }) => {
  const entity: BribeVotingReward_Withdraw = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    tokenId: event.params.tokenId,
    amount: event.params.amount,
  };

  context.BribeVotingReward_Withdraw.set(entity);
});

Gauge.NotifyReward.handler(async ({ event, context }) => {
  const entity: Gauge_NotifyReward = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    from: event.params.from,
    amount: event.params.amount,
  };

  context.Gauge_NotifyReward.set(entity);
});
