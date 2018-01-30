/**
 * Basic configuration object
 */
  module.exports = {
	  auth:{
	    secret: 'my_secret_key'
	  },
	  database:{
	    local: 'mongodb://localhost/risorso-dev',
	    mLab: '' // if you want to use mLab for example
	  },
	  smtpConfig :
	  {
	    host: 'smtp.yandex.com',
        port: 465,
        secure: true, // use SSL
         auth:{
           user: '',
           pass: ''
         }
      }
  };
