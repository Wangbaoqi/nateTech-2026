

| 分类                | 键名 / 通道名 / 流名                                 | 类型                   | 生产者 (Producer)    | 消费者 (Consumer) | 说明                                 |
| ----------------- | --------------------------------------------- | -------------------- | ----------------- | -------------- | ---------------------------------- |
| **数据采集 (Argos)**  | `polymarket.collection.weather`               | **Channel** (PubSub) | Argos (Weather)   | Athena, BFF    | 实时发布原始采集的天气表格数据。                   |
|                   | `polymarket.collection.weather.latest`        | **String** (Key)     | Argos (Weather)   | Athena, BFF    | 存储最新的天气状态快照，用于服务重启或新连接初始化。         |
|                   | `polymarket.events.collection.weather`        | **Stream**           | Argos (Weather)   | Chronos (DB)   | 天气采集的原始 Tick 流，用于持久化到 TimescaleDB。 |
|                   | `data.crypto`                                 | **Channel** (PubSub) | Argos (Crypto)    | BFF            | 实时加密货币价格数据。                        |
|                   | `polymarket.events.collection.crypto`         | **Stream**           | Argos (Crypto)    | Chronos (DB)   | 加密货币价格 Tick 流，用于持久化。               |
| **交易市场 (Hermes)** | `polymarket.trading.events.weather`           | **String** (Key)     | Hermes (Scanner)  | Athena         | 存储从 Polymarket 扫描到的活跃天气市场信息。       |
|                   | `polymarket.trading.positions.latest`         | **String** (Key)     | Hermes (Executor) | BFF            | 存储当前交易账户的最新的持仓快照。                  |
|                   | `polymarket.trading.update.positions`         | **Channel** (PubSub) | Hermes (Executor) | BFF            | 实时持仓变更通知。                          |
|                   | `polymarket.trading.trigger.argos`            | **Channel** (PubSub) | Hermes            | Argos          | 交易侧触发采集侧进行即时抓取的控制指令。               |
| **策略计算 (Athena)** | `polymarket.strategy.weather`                 | **Channel** (PubSub) | Athena            | BFF            | 发布天气策略的状态信息（如胜率、总利润）。              |
|                   | `polymarket.strategy.weather.latest`          | **String** (Key)     | Athena            | BFF            | 存储天气策略的最新状态快照。                     |
|                   | `polymarket.events.strategy.weather_computed` | **Stream**           | Athena            | Chronos (DB)   | 策略计算出的 SafeZone（安全区）结果流，用于后期回测分析。  |
|                   | `trade.signals`                               | **Stream**           | Athena            | Hermes         | **核心信号流**：策略发出的 BUY/SELL 指令。       |
