yarn build
sudo rm -rf /var/www/comic/*
sudo cp -R /home/lmtkg1992/www/comic/out/* /var/www/comic/
sudo chown -R www-data:www-data /var/www/comic
