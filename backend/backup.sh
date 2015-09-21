#!/bin/bash
#Shell Command For Backup MySQL Database Everyday Automatically By Crontab
#Author : Carlos Wong
#Date : 2010-08-24
#配置参数
USER=root #数据库用户名
PASSWORD=zxc #数据库用户密码
DATABASE=race #数据库名称
WEBMASTER=493229225@qq.com #管理员邮箱地址，用以发送备份失败消息提醒
BACKUP_DIR=/home/ubuntu/Data_Backup/race/ #备份文件存储路径
LOGFILE=/home/ubuntu/Data_Backup/race/data_backup.log #日记文件路径
DATE=`date '+%Y%m%d-%H%M'` #日期格式（作为文件名）
DUMPFILE=$DATE.sql #备份文件名
ARCHIVE=$DATE.sql.tgz #压缩文件名
OPTIONS="-u$USER -p$PASSWORD –-opt --databases $DATABASE" #mysqldump 参数 详情见帮助 mysqldump －help

#判断备份文件存储目录是否存在，否则创建该目录
if [ ! -d $BACKUP_DIR ] ;
then
mkdir -p "$BACKUP_DIR"
fi

#判断log文件是否存在
if [ ! -f $LOGFILE ] ;
then
touch "$LOGFILE"
fi

#开始备份之前，将备份信息头写入日记文件
echo " "  >> $LOGFILE
echo " "  >> $LOGFILE
echo "———————————————–" >> $LOGFILE
echo "BACKUP DATE:" $(date +"%y-%m-%d %H:%M:%S") >> $LOGFILE
echo "———————————————– " >> $LOGFILE

#切换至备份目录
cd $BACKUP_DIR
#使用mysqldump 命令备份制定数据库，并以格式化的时间戳命名备份文件
mysqldump $OPTIONS > $DUMPFILE
#判断数据库备份是否成功
if [[ $? == 0 ]]; then
#创建备份文件的压缩包
tar czvf $ARCHIVE $DUMPFILE >> $LOGFILE 2>&1
#输入备份成功的消息到日记文件
echo "[$ARCHIVE] Backup Successful!" >> $LOGFILE
#删除原始备份文件，只需保 留数据库备份文件的压缩包即可
rm -f $DUMPFILE
else
echo "Database Backup Fail!" >> $LOGFILE

#备份失败后向网站管理者发送邮件提醒，需要mailutils或者类似终端下发送邮件工具的支持
#mail -s “Database:$DATABASE Daily Backup Fail” $WEBMASTER
fi
#输出备份过程结束的提醒消息
echo "Backup Process Done"
