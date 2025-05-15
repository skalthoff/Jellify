cd android
git clone https://github.com/Jellify-Music/App-Bundles.git
cd App-Bundles
git checkout android
cd ../..
yarn createBundle:android
cd android/App-Bundles
git add .
git config --global user.email "violet@cosmonautical.cloud"
git config --global user.name "anultravioletaurora"
git commit -m "OTA-Update - $(date +'%b %d %H:%M')"
git push origin head
cd ..
rm -rf App-Bundles
cd ..
