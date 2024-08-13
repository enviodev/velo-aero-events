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

// PoolFactory.PoolCreated.contractRegister(({ event, context }) => {
//   context.addPool(event.params.pool);
// });

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
