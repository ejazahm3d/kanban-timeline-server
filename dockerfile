FROM node:12

WORKDIR /usr/src/project-management

COPY ./ /usr/src/project-management

RUN npm install

CMD ["/bin/bash"]