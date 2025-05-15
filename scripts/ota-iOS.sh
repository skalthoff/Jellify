cd ios
rm -rf App-Bundles
git clone https://github.com/Jellify-Music/App-Bundles.git
cd App-Bundles
git checkout iOS
rm -rf Readme.md
cd ../..
yarn createBundle:ios
cd ios/App-Bundles
git add .
git config --global user.email "violet@cosmonautical.cloud"
git config --global user.name "anultravioletaurora"
git commit -m "OTA-Update - $(date +'%b %d %H:%M')"
git push origin head
cd ..
rm -rf App-Bundles
cd ..
