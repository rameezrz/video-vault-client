# Video Vault [homepage](https://video-vault-client.vercel.app)

![Register Page](https://ovq37ygrsuppsjg2.public.blob.vercel-storage.com/Screenshot%202024-07-08%20025822-tBhyb7k5K4dbslm0AIO6cb3ObndDuL.png)
![Landing Page](https://ovq37ygrsuppsjg2.public.blob.vercel-storage.com/Screenshot%202024-07-08%20025808-VDL8ky0X1rTGwNact7HMxhaldRIV9r.png)
[Backend Repository Link](https://github.com/rameezrz/video-vault-client) (Seperate)

Video Vault is a comprehensive application where users can:

## Features

- Register and securely log in to their accounts
- Personalize profiles by adding bio and avatar
- Upload videos with titles and descriptions for others to watch
- Utilize Cloudinary for efficient media storage
- Trigger automated email notifications using Nodemailer

## Tech Stack

- **Frontend :** React, Antd
- **Backend :** Node.js, Express
- **Database :** Mongodb
- **Other Services :** Cloudinary, Nodemailer
- **Authentication :** JWT

## Setup

##### Prerequisites

- Nodejs
- npm
- Mongodb

##### Installation

1. Clone the Repository

```sh
git clone https://github.com/rameezrz/video-vault-server.git
cd video-vault-server
```

2. Install Dependencies

```sh
npm install
```

3. Environment Variables
   Create a .env file in the root directory and add the following environment variables:

```sh
PORT=3000
NODE_ENV="production"
DATABASE_URL=""
ACCESS_TOKEN_SECRET="your__access__token_secret"
REFRESH_TOKEN_SECRET="your_refresh*_token__secret"
SENDER_EMAIL=""
SENDER_PASSWORD=""
```

4. Run the Application

```sh
npm run dev
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs, improvements, or new features.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

**Free Software, Hell Yeah!**

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[dill]: https://github.com/joemccann/dillinger
[git-repo-url]: https://github.com/joemccann/dillinger.git
[john gruber]: http://daringfireball.net
[df1]: http://daringfireball.net/projects/markdown/
[markdown-it]: https://github.com/markdown-it/markdown-it
[Ace Editor]: http://ace.ajax.org
[node.js]: http://nodejs.org
[Twitter Bootstrap]: http://twitter.github.com/bootstrap/
[jQuery]: http://jquery.com
[@tjholowaychuk]: http://twitter.com/tjholowaychuk
[express]: http://expressjs.com
[AngularJS]: http://angularjs.org
[Gulp]: http://gulpjs.com
[PlDb]: https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md
[PlGh]: https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md
[PlGd]: https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md
[PlOd]: https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md
[PlMe]: https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md
[PlGa]: https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md
