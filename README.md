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

### Some images should not be deleted...

Sometimes, you don't want an image to be delete when it is updated or the object is removed.
For example, if you have a default thumbnail for all users, it shouldn't be deleted when a user uploads their own.

`cloud.undeletables` is an array of IDs you don't want to be deleted:

```typescript
...
cloud.init();

cloud.undeletables = [ process.env.DEFAULT_THUMBNAIL ];
```
