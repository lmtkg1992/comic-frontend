scp -i ~/keys/comic.pem -r /home/lmtkg1992/www/comic/comic-frontend/.next ec2-user@13.212.249.48:/home/ec2-user/comic/comic-frontend
ssh -i ~/keys/comic.pem ec2-user@13.212.249.48 'bash /home/ec2-user/comic/comic-frontend/deploy.sh'