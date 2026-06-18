<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'message' => 'Method not allowed']);
  exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'message' => 'Invalid JSON']);
  exit;
}

$allowedKeys = [
  'agaraorensatu',
  'hydrobuzzgel',
  'agaraorentiga',
  'agaraorenlapan',
  'agaraorenlima'
];

$stock = [];
foreach ($allowedKeys as $key) {
  $stock[$key] = !empty($input[$key]);
}

$dataDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data';
if (!is_dir($dataDir) && !mkdir($dataDir, 0775, true)) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'message' => 'Cannot create data folder']);
  exit;
}

$file = $dataDir . DIRECTORY_SEPARATOR . 'product-stock.json';
$json = json_encode($stock, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
if (file_put_contents($file, $json, LOCK_EX) === false) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'message' => 'Cannot save product stock']);
  exit;
}

echo json_encode(['ok' => true, 'stock' => $stock]);
