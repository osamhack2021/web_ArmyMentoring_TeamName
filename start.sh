cd backend
pip install -r requirements.txt && python manage.py migrate
echo "start server"
nohup python manage.py runserver &
cd ../chatting
echo "start chatting"
yarn install && nohup yarn start &
echo "start web app"
cd ../frontend/army_mentoring
yarn install && nohup yarn start &
