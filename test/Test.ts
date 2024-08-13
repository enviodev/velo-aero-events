import assert from "assert";
import { 
  TestHelpers,
  CLFactory_PoolCreated
} from "generated";
const { MockDb, CLFactory } = TestHelpers;

describe("CLFactory contract PoolCreated event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for CLFactory contract PoolCreated event
  const event = CLFactory.PoolCreated.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("CLFactory_PoolCreated is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await CLFactory.PoolCreated.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualCLFactoryPoolCreated = mockDbUpdated.entities.CLFactory_PoolCreated.get(
      `${event.transactionHash}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedCLFactoryPoolCreated: CLFactory_PoolCreated = {
      id: `${event.transactionHash}_${event.logIndex}`,
      token0: event.params.token0,
      token1: event.params.token1,
      tickSpacing: event.params.tickSpacing,
      pool: event.params.pool,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualCLFactoryPoolCreated, expectedCLFactoryPoolCreated, "Actual CLFactoryPoolCreated should be the same as the expectedCLFactoryPoolCreated");
  });
});
