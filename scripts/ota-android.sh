cd android
git clone https://github.com/Jellify-Music/App-Bundles.git
cd App-Bundles
git checkout android
cd ../..
yarn createBundle:android
cd android/App-Bundles
git add .
git commit -m "OTA-Update - $(date +'%b %d %H:%M')"
git push https://x-access-token:$SIGNING_REPO_PAT@github.com/Jellify-Music/App-Bundles.git android
cd ..
rm -rf App-Bundles
cd ..
