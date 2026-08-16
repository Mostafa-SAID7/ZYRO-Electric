/**
 * Cache Report Generator with Routing Validation
 * Generates live-report.json with consistent bucket assignments
 */

interface ClusterMetrics {
  cluster_id: string;
  structural_similarity: number;
  token_jaccard: number;
  files: string[];
  bucket?: 'identical' | 'nearly_identical' | 'structural_only' | 'semantic';
}

interface CacheReport {
  generated_at: string;
  routing_rules: {
    identical: { structural: number; token_jaccard: number };
    nearly_identical: { structural: number; token_jaccard_min: number };
    structural_only: { structural: number; token_jaccard_max: number };
    semantic: { structural_max: number; token_jaccard_min: number };
  };
  clusters: ClusterMetrics[];
  validation: {
    passed: boolean;
    errors: string[];
  };
}

/**
 * Routing Rules (immutable)
 */
const ROUTING_RULES = {
  identical: {
    structural: 1.0,
    token_jaccard: 1.0,
  },
  nearly_identical: {
    structural: 1.0,
    token_jaccard_min: 0.85,
  },
  structural_only: {
    structural: 1.0,
    token_jaccard_max: 0.05,
  },
  semantic: {
    structural_max: 0.99,
    token_jaccard_min: 0.6,
  },
} as const;

/**
 * Assign bucket based on metrics
 */
function assignBucket(
  structural: number,
  tokenJaccard: number
): ClusterMetrics['bucket'] {
  // Rule 1: Identical (exact match on both metrics)
  if (structural === 1.0 && tokenJaccard === 1.0) {
    return 'identical';
  }

  // Rule 2: Nearly Identical (structural perfect, high token similarity)
  if (structural === 1.0 && tokenJaccard >= 0.85) {
    return 'nearly_identical';
  }

  // Rule 3: Structural Only (structural perfect, low token similarity)
  if (structural === 1.0 && tokenJaccard < 0.05) {
    return 'structural_only';
  }

  // Rule 4: Semantic (high semantic similarity, not structurally identical)
  if (structural < 1.0 && tokenJaccard >= 0.6) {
    return 'semantic';
  }

  // Fallback: semantic bucket for anything else
  return 'semantic';
}

/**
 * Validate cluster routing consistency
 */
function validateClusterRouting(cluster: ClusterMetrics): string[] {
  const errors: string[] = [];
  const { cluster_id, structural_similarity, token_jaccard, bucket } = cluster;

  if (!bucket) {
    errors.push(`Cluster ${cluster_id}: Missing bucket assignment`);
    return errors;
  }

  switch (bucket) {
    case 'identical':
      if (structural_similarity !== 1.0) {
        errors.push(
          `Cluster ${cluster_id}: 'identical' requires structural=1.0, got ${structural_similarity}`
        );
      }
      if (token_jaccard !== 1.0) {
        errors.push(
          `Cluster ${cluster_id}: 'identical' requires token_jaccard=1.0, got ${token_jaccard}`
        );
      }
      break;

    case 'nearly_identical':
      if (structural_similarity !== 1.0) {
        errors.push(
          `Cluster ${cluster_id}: 'nearly_identical' requires structural=1.0, got ${structural_similarity}`
        );
      }
      if (token_jaccard < 0.85) {
        errors.push(
          `Cluster ${cluster_id}: 'nearly_identical' requires token_jaccard >= 0.85, got ${token_jaccard}`
        );
      }
      if (token_jaccard === 1.0) {
        errors.push(
          `Cluster ${cluster_id}: token_jaccard=1.0 should be 'identical', not 'nearly_identical'`
        );
      }
      break;

    case 'structural_only':
      if (structural_similarity !== 1.0) {
        errors.push(
          `Cluster ${cluster_id}: 'structural_only' requires structural=1.0, got ${structural_similarity}`
        );
      }
      if (token_jaccard >= 0.05) {
        errors.push(
          `Cluster ${cluster_id}: 'structural_only' requires token_jaccard < 0.05, got ${token_jaccard}`
        );
      }
      break;

    case 'semantic':
      if (structural_similarity === 1.0 && token_jaccard >= 0.85) {
        errors.push(
          `Cluster ${cluster_id}: Should be 'nearly_identical', not 'semantic' (structural=1.0, token_jaccard=${token_jaccard})`
        );
      }
      if (structural_similarity === 1.0 && token_jaccard === 1.0) {
        errors.push(
          `Cluster ${cluster_id}: Should be 'identical', not 'semantic' (structural=1.0, token_jaccard=1.0)`
        );
      }
      break;
  }

  return errors;
}

/**
 * Generate mock cluster data (replace with real data source)
 */
function generateMockClusters(): ClusterMetrics[] {
  return [
    // Identical: Perfect match on both dimensions
    {
      cluster_id: 'a1b2c3d4e5f6g7h8',
      structural_similarity: 1.0,
      token_jaccard: 1.0,
      files: ['file1.ts', 'file2.ts'],
    },
    // Nearly Identical: Perfect structure, high token similarity
    {
      cluster_id: 'f7e660299da5a190',
      structural_similarity: 1.0,
      token_jaccard: 0.92,
      files: ['file3.ts', 'file4.ts'],
    },
    // Structural Only: Perfect structure, low token similarity
    {
      cluster_id: '3f64602ec7d6bd4d',
      structural_similarity: 1.0,
      token_jaccard: 0.03,
      files: ['file5.ts', 'file6.ts'],
    },
    // Semantic: High semantic similarity, not perfect structure
    {
      cluster_id: 'b8c9d0e1f2g3h4i5',
      structural_similarity: 0.87,
      token_jaccard: 0.75,
      files: ['file7.ts', 'file8.ts'],
    },
    // Another Nearly Identical
    {
      cluster_id: 'c2d3e4f5g6h7i8j9',
      structural_similarity: 1.0,
      token_jaccard: 0.88,
      files: ['file9.ts', 'file10.ts'],
    },
  ];
}

/**
 * Generate validated report
 */
function generateReport(): CacheReport {
  const clusters = generateMockClusters();

  // Assign buckets to all clusters
  const clustersWithBuckets = clusters.map((cluster) => ({
    ...cluster,
    bucket: assignBucket(cluster.structural_similarity, cluster.token_jaccard),
  }));

  // Validate all clusters
  const allErrors: string[] = [];
  clustersWithBuckets.forEach((cluster) => {
    const errors = validateClusterRouting(cluster);
    allErrors.push(...errors);
  });

  const report: CacheReport = {
    generated_at: new Date().toISOString(),
    routing_rules: ROUTING_RULES,
    clusters: clustersWithBuckets,
    validation: {
      passed: allErrors.length === 0,
      errors: allErrors,
    },
  };

  return report;
}

/**
 * Main execution
 */
function main() {
  const report = generateReport();

  // Validation assertion before commit
  if (!report.validation.passed) {
    console.error('❌ Validation FAILED. Report has routing inconsistencies:');
    report.validation.errors.forEach((error) => {
      console.error(`  - ${error}`);
    });
    process.exit(1);
  }

  console.log('✅ Validation PASSED. All clusters correctly routed.');
  console.log('\n📊 Report Summary:');
  console.log(`  Generated: ${report.generated_at}`);
  console.log(`  Total Clusters: ${report.clusters.length}`);

  const bucketCounts = report.clusters.reduce(
    (acc, cluster) => {
      acc[cluster.bucket!]++;
      return acc;
    },
    { identical: 0, nearly_identical: 0, structural_only: 0, semantic: 0 }
  );

  console.log('  Bucket Distribution:');
  console.log(`    - Identical: ${bucketCounts.identical}`);
  console.log(`    - Nearly Identical: ${bucketCounts.nearly_identical}`);
  console.log(`    - Structural Only: ${bucketCounts.structural_only}`);
  console.log(`    - Semantic: ${bucketCounts.semantic}`);

  // Write report to cache directory
  const fs = require('fs');
  const path = require('path');

  const cacheDir = path.join(__dirname, '..', '.deslop', 'cache');
  const reportPath = path.join(cacheDir, 'live-report.json');

  // Ensure directory exists
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`\n💾 Report saved to: ${reportPath}`);
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { generateReport, validateClusterRouting, assignBucket, ROUTING_RULES };
