FROM node

ENV NPM_CONFIG_LOGLEVEL warn
ARG NODE_ENV
ENV APP_ENV $NODE_ENV

RUN mkdir -p /frontend
WORKDIR /frontend
ADD ./ ./

RUN npm install

CMD if [ ${APP_ENV} = production ]; \
	then \
	npm install && \
	npm run build && \
	cd build && \
	hs -p 3000; \
	else \
	npm install && \
	npm run start; \
	fi

EXPOSE 3000
