# PointyAPI Cloudinary

## Install
`npm i pointyapi-cloudinary`

## Use

```typescript
import { cloud } from 'pointyapi-cloudinary';

pointy.before = (app) => {
	...

	// Initialize Cloudinary
	cloud.init();

	...
}

...

router.patch('/', async (request, response, next) => {
	if (cloud.isThumbnailUpdate(request, response, 'thumbnail')) {
		await cloud.delete(request.payload['thumbnail']);
	}
});

```
