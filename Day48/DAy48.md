# Cloud Databases: Compare & Decide Research Report

This document compiles the research, scoring guidelines, data points, and sources used to build the Compare & Decide tool for database selection.

## 1. Audience & Use Case
*   **Target Audience**: Lead Developers and Systems Architects.
*   **Goal**: Choose the standard database to host a new, highly scalable, high-availability multi-tenant SaaS application.

---

## 2. Evaluation Criteria & Scoring Logic

To normalize comparison across diverse architectures, each database is scored from **0 to 10** on each of the following criteria:

### Criteria 1: Cost (Total Cost of Ownership - TCO)
*   **Definition**: The entry cost, predictability, and linear scaling costs of the database platform.
*   **Scoring Metric**:
    *   **10**: Extremely cheap, serverless, scale-to-zero, free tier.
    *   **7-8**: Affordable dedicated starting tiers, predictable pricing.
    *   **4-6**: High entry barrier, provisioned pricing, expensive multi-region setups.
    *   **1-3**: Premium-only pricing with high minimum spends.

### Criteria 2: Scalability (Latency & Throughput)
*   **Definition**: How easily the system scales reads and writes horizontally while maintaining single-digit millisecond latency.
*   **Scoring Metric**:
    *   **10**: Horizontal read & write scaling out-of-the-box globally, automatic scale-up/down.
    *   **8-9**: Horizontal write scaling with managed sharding; automatic read scaling.
    *   **6-7**: Vertical scaling with read replicas; horizontal write scaling is complex/manual.
    *   **1-5**: Relies on application-level partitioning or single node constraints.

### Criteria 3: Reliability & Consistency (ACID & SLAs)
*   **Definition**: Guarantee of transaction safety, failover times, and SLA availability.
*   **Scoring Metric**:
    *   **10**: External consistency (stronger than serializability), global multi-region ACID without locks, 99.999% SLA.
    *   **8-9**: Multi-region active-passive failover, ACID compliant, 99.99% - 99.995% SLA.
    *   **6-7**: Single-region Multi-AZ replication, ACID transactions optional/costly, 99.9% - 99.95% SLA.

### Criteria 4: Developer Velocity (Schema Ease & Tooling)
*   **Definition**: Learning curve, ease of local development, schema migrations, and standard query interfaces.
*   **Scoring Metric**:
    *   **10**: Schema-less/flexible JSON, intuitive SQL query syntax, outstanding local mock/development tools.
    *   **8-9**: Structured SQL with robust ORM support, but migrations required.
    *   **5-7**: Complex query modeling (e.g. Single Table Design), restricted query syntax, or heavy local emulators.

---

## 3. Researched Data & Citations

### 1. MongoDB Atlas
*   **Cost Score: 8/10**
    *   *Data Point*: Free tier available (M0). Shared instances (M2/M5) are $9-$25/mo. Serverless is $0.10/million reads, $0.30/million writes. M10 dedicated starts at ~$0.08/hr ($57/mo).
    *   *Citation*: [MongoDB Atlas Pricing Page](https://www.mongodb.com/pricing)
*   **Scalability Score: 8/10**
    *   *Data Point*: Supports automated horizontal sharding and read replicas. Serverless scales automatically based on request load. Latency is single-digit ms.
    *   *Citation*: [MongoDB Atlas Scalability Documentation](https://www.mongodb.com/docs/atlas/scalability/)
*   **Reliability & Consistency Score: 8/10**
    *   *Data Point*: Supports multi-document ACID transactions since v4.0. Jepsen 4.2.6 analysis verified consistency under strict write concern. SLA is 99.995% for multi-region.
    *   *Citation*: [Jepsen Analysis of MongoDB 4.2.6](https://jepsen.io/analyses/mongodb-4.2.6), [MongoDB Atlas SLA](https://www.mongodb.com/legal/service-terms)
*   **Developer Velocity Score: 9/10**
    *   *Data Point*: Schema-less document design allows fast iteration. Rich tooling (MongoDB Compass, VS Code extensions) and popular MERN ecosystem.
    *   *Citation*: [DB-Engines Ranking - Document Stores](https://db-engines.com/en/ranking/document+store)

### 2. PostgreSQL on AWS RDS
*   **Cost Score: 7/10**
    *   *Data Point*: Single-AZ db.t4g.micro starts at ~$0.016/hr (~$12/month). Multi-AZ production db.m6g.xlarge is ~$0.304/hr (~$222/month), plus storage ($0.115/GB-month for gp3).
    *   *Citation*: [AWS RDS PostgreSQL Pricing](https://aws.amazon.com/rds/postgresql/pricing/)
*   **Scalability Score: 6/10**
    *   *Data Point*: Easy vertical scaling. Horizontal read scaling is supported with up to 15 read replicas. Horizontal write scaling requires manual sharding or third-party extensions like Citus.
    *   *Citation*: [AWS RDS PostgreSQL Scalability Guide](https://aws.amazon.com/rds/features/read-replicas/)
*   **Reliability & Consistency Score: 8.5/10**
    *   *Data Point*: Strictly ACID-compliant. Multi-AZ deployment provides automatic failover (takes 1-2 mins). Multi-AZ SLA is 99.95%.
    *   *Citation*: [AWS RDS Service Level Agreement](https://aws.amazon.com/rds/sla/)
*   **Developer Velocity Score: 8.5/10**
    *   *Data Point*: Structured relational database. SQL standard is widely known. Highly supported by popular ORMs (Prisma, Sequelize, TypeORM). Migrations are required for schema updates.
    *   *Citation*: [Stack Overflow Developer Survey - Databases](https://survey.stackoverflow.co/2023/#section-most-popular-technologies-databases)

### 3. Google Cloud Spanner
*   **Cost Score: 5/10**
    *   *Data Point*: Premium enterprise Pricing. Entry-level 0.1 compute units (100 processing units) costs ~$0.065/hr (~$47.45/mo) in US-Central1, plus storage ($0.30/GB/month). Multi-region starts at ~$200+/month.
    *   *Citation*: [Google Cloud Spanner Pricing](https://cloud.google.com/spanner/pricing)
*   **Scalability Score: 9.5/10**
    *   *Data Point*: Horizontally scalable globally for both reads and writes. Scales to millions of QPS. Write latency is slightly higher (~5-10ms) due to synchronous global consensus.
    *   *Citation*: [Spanner: Google’s Globally Distributed Database](https://research.google/pubs/spanner-googles-globally-distributed-database/)
*   **Reliability & Consistency Score: 10/10**
    *   *Data Point*: External consistency using TrueTime (atomic clocks/GPS). Offers global ACID transactions without locks. SLA is 99.999% (five nines) for multi-region configurations.
    *   *Citation*: [Google Cloud Spanner SLA](https://cloud.google.com/spanner/sla)
*   **Developer Velocity Score: 7/10**
    *   *Data Point*: Strictly typed relational model. Online schema changes do not lock the database, but migrations are required. Local testing relies on a heavy emulator.
    *   *Citation*: [Cloud Spanner Schema Updates](https://cloud.google.com/spanner/docs/schema-updates)

### 4. Amazon DynamoDB
*   **Cost Score: 9/10**
    *   *Data Point*: Serverless. On-demand pricing: $0.25/million writes (WRUs), $0.05/million reads (RRUs). Storage is $0.25/GB-month. Scale-to-zero with a generous free tier of 25 GB storage and 25 WCU/RCU.
    *   *Citation*: [Amazon DynamoDB Pricing](https://aws.amazon.com/dynamodb/pricing/)
*   **Scalability Score: 9.5/10**
    *   *Data Point*: Horizontally scales automatically. Maintains predictable, single-digit millisecond latency regardless of scale. Can reach millions of requests per second.
    *   *Citation*: [DynamoDB Architecture - Scaling](https://aws.amazon.com/dynamodb/details/)
*   **Reliability & Consistency Score: 8/10**
    *   *Data Point*: 99.99% SLA for single-region, 99.999% SLA for Global Tables. Eventual consistency by default, strong consistency can be requested. ACID transactions supported at double read/write cost.
    *   *Citation*: [Amazon DynamoDB SLA](https://aws.amazon.com/dynamodb/sla/)
*   **Developer Velocity Score: 6.5/10**
    *   *Data Point*: Requires Single Table Design for advanced queries. No SQL joins. Highly specialized partition/sort key query model. AWS-specific SDKs. Tooling is good (NoSQL Workbench) but has a steep learning curve.
    *   *Citation*: [DynamoDB Best Practices for Data Modeling](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices-data-modeling.html)

---

## 4. Conflict Resolution & Assumptions

*   **Instance-based vs. Serverless Cost Comparison**: AWS RDS and Google Cloud Spanner use provisioned/instance pricing models, whereas DynamoDB is serverless. MongoDB Atlas supports both. To compare cost fairly, we evaluated a standard SaaS starter tier: small workloads (under 10 million reads/writes per month, ~10GB data) and medium workloads (100 million reads/writes per month, ~100GB data). Serverless options (DynamoDB and Atlas Serverless) score higher for low-to-medium/unpredictable traffic due to scale-to-zero capabilities, whereas Cloud Spanner remains expensive even at low idle usage.
*   **Scalability Definitions**: We defined Scalability as the combination of read horizontal scaling, write horizontal scaling, and latency consistency under load. Spanner and DynamoDB score highest because write scaling is handled transparently, whereas PostgreSQL RDS scores lower because write horizontal scaling requires complex manual sharding.
