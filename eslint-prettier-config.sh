#!/bin/bash

YELLOW='\033[1;33m'
GREEN='\033[1;32m'
LCYAN='\033[1;36m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Style Formatting Configuration... ${NC}"

echo -e "1/5 ${LCYAN}Local ESLint & Prettier Installation... ${NC}"
npm install -D eslint@5.6.0 prettier

echo -e "2/5 ${YELLOW}Airbnb Configuration Installation... ${NC}"
npm install -D eslint-config-airbnb  eslint-plugin-import babel-eslint

echo -e "3/5 ${LCYAN}Disabling ESLint Formatting... ${NC}"
npm install -D eslint-config-prettier eslint-plugin-prettier eslint-plugin-flowtype@2.50.3 

echo -e "4/5 ${YELLOW}Creating ESLint JSON... ${NC}"
touch .eslintrc.json

echo '{
  "extends": ["airbnb", "prettier", "plugin:prettier/recommended"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error"]
  }
}' >> .eslintrc.json

echo -e "5/5 ${YELLOW}Creating Custom Prettier Config... ${NC}"
touch .prettierrc

echo '{
  "printWidth": 100,
  "singleQuote": true
}' >> .prettierrc

echo -e "${GREEN}Done! ${NC}"

