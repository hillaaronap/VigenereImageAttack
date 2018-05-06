function enc = EncryptImage(x,k,f)
fd=fopen(string(x), 'r');
fr=fread(fd);
fclose(fd);
fr = fr';
k1=double(k);
n=size(fr,2);
m=size(k,2);
for i=1 : n
    xp = double(fr(i));
    ii = mod(i-1,m)+1;
    enc(i)=mod(xp+k1(ii),256);
end;
fd=fopen(string(f),'w+');
fwrite(fd,enc);
fclose(fd);