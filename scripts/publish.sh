#!/usr/bin/env bash

if [[ ! -z "$1" ]]; then
  update_type="$1"
fi

if [[ ! -z "$2" ]]; then
  version="$2"
fi

echo
if [[ ! "$update_type" =~ ^(patch|minor|major)$ ]]; then
  error=1
  echo "Please specify update type - patch | minor | major"
fi

if [[ ! ${version} =~ ^(v?[0-9]+\.[0-9]+\.[0-9]+)(-.*)?$ ]] ; then
  error=1
  echo "Please specify valid git tag (semantic versioning standard)"
fi

if [[ ! -z "$error" ]]; then
  echo
  echo "Usage: "
  echo "./publish.sh patch|minor|major [v]XX.XX.XX[-build|alpha|beta.XXX]"
else
  if [[ ${version:0:1} != "v" ]]; then
      version="v${version}"
  fi

  echo "1. [build] yarn build:prod"
  yarn build:prod > /dev/null
  echo "2. [publish] npm version $update_type"
  npm version $update_type
  echo "3. [publish] npm publish"
  npm publish
  echo "4. [git] git commit -am \"New version ${version}\""
  git commit -am "New version ${version}"
  echo "4 [git] git tag -a ${version} -m \"Version ${version}\""
  git tag -a ${version} -m "Version ${version}"
  echo "5. [git] git push && git push --tags"
  git push && git push --tags
fi

echo
