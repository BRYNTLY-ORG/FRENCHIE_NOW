#!/usr/bin/env node

/**
 * REPO_BOOTSTRAP Safety Guard
 * 
 * This utility is provisioned to every organization repository.
 * It provides a standardized way for AI agents and human engineers to verify 
 * that their changes comply with the repository's "Living Contract".
 */

import fs from 'node:fs';
import path from 'node:path';

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

async function run() {
  console.log(`${YELLOW}🛡️  Safety Guard: Performing compliance check...${RESET}`);

  const checks = [
    checkProdSpec,
    checkLessonsLearned,
    checkActionPinning,
  ];

  let passed = true;
  for (const check of checks) {
    if (!await check()) passed = false;
  }

  if (passed) {
    console.log(`\n${GREEN}✅ COMPLIANCE PASSED. Proceed with PR.${RESET}`);
  } else {
    console.log(`\n${RED}❌ COMPLIANCE FAILED. Please address the issues above.${RESET}`);
    process.exit(1);
  }
}

async function checkProdSpec() {
  const specPath = 'PROD_SPEC.md';
  if (!fs.existsSync(specPath)) {
    console.log(`${RED}  - PROD_SPEC.md is missing.${RESET}`);
    return false;
  }

  const content = fs.readFileSync(specPath, 'utf-8');
  if (content.includes('[Repository Name]')) {
    console.log(`${YELLOW}  - PROD_SPEC.md is still using the default template.${RESET}`);
    return true; // Non-blocking but warn
  }

  console.log(`${GREEN}  - PROD_SPEC.md is customized.${RESET}`);
  return true;
}

async function checkLessonsLearned() {
  const lessonsPath = 'PROJECT/Docs/LESSONS_LEARNED.md';
  if (!fs.existsSync(lessonsPath)) {
    console.log(`${YELLOW}  - LESSONS_LEARNED.md is missing. Agents: initialize this file.${RESET}`);
    return true;
  }

  const content = fs.readFileSync(lessonsPath, 'utf-8');
  if (!content.includes('## 💡 Technical Insights')) {
    console.log(`${RED}  - LESSONS_LEARNED.md is malformed.${RESET}`);
    return false;
  }

  console.log(`${GREEN}  - LESSONS_LEARNED.md is present.${RESET}`);
  return true;
}

async function checkActionPinning() {
  const workflowsDir = '.github/workflows';
  if (!fs.existsSync(workflowsDir)) return true;

  const files = fs.readdirSync(workflowsDir).filter(f => f.endsWith('.yml') || f.name?.endsWith('.yaml'));
  let allPinned = true;

  for (const file of files) {
    const content = fs.readFileSync(path.join(workflowsDir, file), 'utf-8');
    // Look for 'uses: something@v1' without a SHA comment
    if (/@(?![a-f0-9]{40})[a-zA-Z0-9.]+/.test(content)) {
      console.log(`${RED}  - Unpinned GitHub Action detected in ${file}${RESET}`);
      allPinned = false;
    }
  }

  if (allPinned) {
    console.log(`${GREEN}  - All GitHub Actions are pinned to SHAs.${RESET}`);
  }
  return allPinned;
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
