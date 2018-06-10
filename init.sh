if [ $# -eq 1 ]
then
  echo "Firebase Project: $1"
  if [ ! -f "app-configs/env.json" ]
  then
    cp app-configs/env-example.json app-configs/env.json
    sed -i -e "s/PROJECT_ID/$1/g" app-configs/env.json
    echo "Please add required credentials to app-configs/env.json"
  fi

  npm install && cd functions && npm install && cd ../
  npm install -g gulp-cli firebase-tools
  npm run build-all

  firebase use $1
  firebase serve
else
  echo "Please provide firebase project id. Eg. ./init.sh <project-id>"
fi
