# Com9Phut
API repos cho dịch vụ giao cơm 9 phút
clone về, npm i để cài package,
Create a new .env file for the backend and generate a new APP_KEY. Copy the output and paste it into the .env file at the end of the line for APP_KEY.
cp .env.example .env
node ace generate:key #Generates new APP_KEY
node ace migration:run để add database
node ace db:seed để install dữ liệu