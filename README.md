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

// Usage is very simple if the thumbnail members are named 'thumbnail'
router.patch('/', onlySelf, cloud.updateThumbnail, patchEndpoint);
router.delete('/', onlySelf, cloud.deleteThumbnail, deleteEndpoint);

// Otherwise, pass an argument to specify custom thumbnail member names
router.patch(
	'/',
	onlySelf,
	(req, res, next) =>
		cloud.updateThumbnail(req, res, next, 'customThumbnail'),
	patchEndpoint
);
router.delete(
	'/',
	onlySelf,
	(req, res, next) =>
		cloud.deleteThumbnail(req, res, next, 'customThumbnail'),
	deleteEndpoint
);

```
