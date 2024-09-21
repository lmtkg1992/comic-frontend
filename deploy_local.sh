cd /home/lmtkg1992/www/comic/comic-frontend
npm run build
sudo rm -rf /var/www/comic/*
sudo cp -r /home/lmtkg1992/www/comic/comic-frontend/out/* /var/www/comic/
sudo service nginx restart