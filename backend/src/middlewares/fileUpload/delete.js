import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3delete = function (photoData) {
  new Promise((resolve, reject) => {
    s3.createBucket(
      {
        Bucket: process.env.AWS_BUCKET_NAME,
      },
      () => {
        s3.deleteObject(photoData, (err, data) => {
          if (err) console.log(err);
          else console.log('Successfully deleted file from bucket');
        });
      }
    );
  });
};

export default s3delete;
