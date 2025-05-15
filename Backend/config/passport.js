const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
require('dotenv').config();
const { google } = require('googleapis');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('Access Token:', accessToken);
        console.log('Profile:', profile);

        // Tạo OAuth2 client để xác thực với Google People API
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: accessToken });

        // Khởi tạo client Google People API
        const people = google.people({
          version: 'v1',
          auth: oauth2Client
        });

        // Lấy thông tin ngày sinh và địa chỉ từ Google People API
        const person = await people.people.get({
          resourceName: 'people/me',
          personFields: 'birthdays,addresses,phoneNumbers'
        });

        console.log('Google People API full response:', JSON.stringify(person.data, null, 2)); // Log chi tiết

        // Xử lý ngày sinh
        let birthday = null;
        if (person.data.birthdays && person.data.birthdays.length > 0) {
          const bday = person.data.birthdays[0].date;
          if (bday) {
            birthday = `${bday.year}-${bday.month}-${bday.day}`;
          }
        }

        // Tìm hoặc tạo user trong database
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : '',
            fullName: profile.displayName || 'Unknown',
            picture: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : '',
            birthday: birthday,
          });
          await user.save();
          console.log('New user saved:', user);
        } else {
          user.birthday = birthday || user.birthday;
          await user.save();
          console.log('User updated:', user);
        }

        return done(null, user);
      } catch (error) {
        console.error('Passport Google Strategy error:', error.message);
        console.error('Error stack:', error.stack);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log('Serializing user:', user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log('Deserialized user:', user);
    done(null, user);
  } catch (error) {
    console.error('Deserialize user error:', error.message);
    done(error, null);
  }
});

module.exports = passport;