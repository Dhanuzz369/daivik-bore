import './location-tsx-loader.mjs';
import assert from 'node:assert/strict';
import test from 'node:test';
import { locationRecords, isPublishableLocation, getPublishedLocations, getPublishedLocation } from '../data/locations.ts';

// Fictional test data only; never a production locality or source.
const synthetic = {
  slug: 'synthetic-test-only', name: 'Synthetic Test Area', aliases: ['synthetic-alias'],
  coverageLabels: ['Synthetic Test Area'], introduction: 'Fictional fixture for publication tests.',
  sections: [{ heading: 'Synthetic access arrangements', body: 'The fictional site requires an access check before mobilization.' }],
  questions: [{ question: 'What is checked?', answer: 'The fictional access arrangement.' }],
  evidence: [{ source: 'Synthetic test-only access note', supports: ['Synthetic access arrangements'] }],
  review: { status: 'approved', reviewedBy: 'Synthetic Reviewer', reviewedAt: '2026-10-11' },
};

test('approved substantive synthetic fixture passes the gate', () => {
  assert.equal(isPublishableLocation(synthetic), true);
});

test('publication requires at least one FAQ and nonblank text in every question and answer', () => {
  const cases = [
    [],
    [{ question: '', answer: 'Synthetic answer.' }],
    [{ question: ' \t\n', answer: 'Synthetic answer.' }],
    [{ question: 'Synthetic question?', answer: '' }],
    [{ question: 'Synthetic question?', answer: ' \t\n' }],
    [...synthetic.questions, { question: ' ', answer: 'Synthetic answer.' }],
    [...synthetic.questions, { question: 'Synthetic question?', answer: ' ' }],
  ];
  for (const questions of cases) {
    assert.equal(isPublishableLocation({ ...synthetic, questions }), false, JSON.stringify(questions));
  }
  assert.equal(isPublishableLocation({
    ...synthetic,
    questions: [{ question: ' Synthetic question? ', answer: ' Synthetic answer. ' }],
  }), true);
});

test('pending, coverage-only and unsupported sections cannot publish', () => {
  const cases = [
    { review: { ...synthetic.review, status: 'pending' } },
    { sections: [], evidence: [{ source: 'Coverage confirmation', supports: ['coverage'] }] },
    { evidence: [] },
    { evidence: [{ source: 'Coverage confirmation', supports: ['coverage'] }] },
    { evidence: [{ source: ' ', supports: ['Synthetic access arrangements'] }] },
    { sections: [{ heading: 'Synthetic access arrangements', body: ' ' }] },
    { sections: [...synthetic.sections, { heading: 'Unsupported section', body: 'Another fictional requirement.' }] },
  ];
  for (const changes of cases) assert.equal(isPublishableLocation({ ...synthetic, ...changes }), false);
});

test('approval requires a named reviewer and valid calendar date', () => {
  for (const review of [
    { ...synthetic.review, reviewedBy: ' ' },
    ...['', 'yesterday', '2026-02-30', '2026-13-01', '2026-1-1'].map(reviewedAt => ({ ...synthetic.review, reviewedAt })),
  ]) assert.equal(isPublishableLocation({ ...synthetic, review }), false);
});

test('catalogue publishes sixteen complete, individually written local guides', () => {
  assert.deepEqual(locationRecords.map(record => record.slug), [
    'devanahalli-airport-road', 'nelamangala', 'doddaballapura', 'kanakapura-road',
    'kengeri', 'hosur-road', 'bhartiya-city-thanisandra', 'whitefield', 'peenya',
    'jigani', 'dabaspet-sompura', 'hoskote', 'bidadi', 'harohalli',
    'aerospace-hardware-parks', 'south-bengaluru',
  ]);
  assert.equal(new Set(locationRecords.map(record => record.slug)).size, 16);
  for (const record of locationRecords) {
    assert.equal(record.review.status, 'approved');
    assert.ok(record.sections.length >= 2);
    assert.ok(record.questions.length >= 2);
    assert.equal(isPublishableLocation(record), true);
    assert.equal(getPublishedLocation(record.slug), record);
    for (const alias of record.aliases) assert.equal(getPublishedLocation(alias), undefined);
  }
  assert.equal(getPublishedLocations().length, 16);
  assert.equal(new Set(locationRecords.map(record => record.introduction)).size, 16);
  assert.equal(new Set(locationRecords.map(record => record.sections[0].body)).size, 16);
  assert.equal(getPublishedLocation('unknown-area'), undefined);
});
