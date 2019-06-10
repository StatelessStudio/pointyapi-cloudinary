const cloudinary = require('cloudinary').v2;

export class PointyCloudinary {
	/**
	 * Initialize Cloudinary
	 */
	public init() {
		cloudinary.config({
			cloud_name: process.env.CLOUDINARY_NAME,
			api_key: process.env.CLOUDINARY_KEY,
			api_secret: process.env.CLOUDINARY_SECRET
		});
	}

	/**
	 * Check if this request is updating the thumbnail
	 * @param request Express Request
	 * @param response Express Response
	 * @param member Member field name to check. Default is 'thumbnail'
	 */
	public isThumbnailUpdate(request, response, member: string = 'thumbnail') {
		return (
			member in request.payload &&
			member in request.body &&
			request.payload[member] !== request.body[member]
		);
	}

	/**
	 * Delete the given thumbnail
	 * @param id Cloudinary resource ID to delete
	 */
	public delete(id: number | string) {
		return new Promise((a, r) => {
			cloudinary.uploader.destroy(id, {}, (error, result) => {
				if (error) r(error);
				else a(result);
			});
		});
	}
}

export const cloud = new PointyCloudinary();
