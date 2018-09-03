---
layout: post
title:  "Lựa chọn Amazon S3 hay Amazon EBS để lưu trữ file"
date:   2018-08-27 10:11:33 +0700
bigimg: /img/chrome-min.jpg
share-img: /img/chrome-min.jpg
tags: [programming, in-depth]
---

### S3
Benefits of using Amazon S3 to store static assets such as pictures and videos:

S3 is pay-as-you-go (only pay for the storage consumed, with different options depending upon how often/fast you wish to retrieve the objects)
S3 is highly available: You don't need to run any servers
S3 is highly durable: Your data is duplicated across three data centres, so it is more resilient to failure
S3 is highly scalable: It can handle massive volumes of requests. If you served content from Amazon EC2, you'd have to scale-out to meet requests
S3 has in-built security at the object, bucket and user level.

### EBS


You would need to pre-provision storage using Amazon EBS volumes (and you pay for the entire volume even if it isn't all used)
You would need to Snapshot the EBS volumes to improve durability (EBS Snapshots are stored in Amazon S3, replicated between data centres)
You would need to scale your EC2 instances (make them bigger, or add more) to handle the workload
You would need to replicate data between instances if you are running multiple EC2 instances to meet request volumes
You would need to install and configure the software on the EC2 instance(s) to manage security, content serving, monitoring, etc.


### References

[https://serverfault.com/questions/113184/should-i-persist-images-on-ebs-or-s3](https://serverfault.com/questions/113184/should-i-persist-images-on-ebs-or-s3)
[https://stackoverflow.com/questions/41851027/amazon-s3-vs-ec2-storing-files](https://stackoverflow.com/questions/41851027/amazon-s3-vs-ec2-storing-files)