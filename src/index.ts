const cloudinary = require('cloudinary').v2;

export class PointyCloudinary {
	public undeletables: any[] = [];

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
	 * @param member Member field name to check. Default is 'thumbnail'
	 */
	public isThumbnailUpdate(request, member: string = 'thumbnail') {
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
			if (this.undeletables.includes(id)) {
				a();
			}
			else {
				cloudinary.uploader.destroy(id, {}, (error, result) => {
					if (error) r(error);
					else a(result);
				});
			}
		});
	}

	/**
	 * Middleware to check if this request is a thumbnail update
	 * @param request Express Request
	 * @param response Express Response
	 * @param next Express NextFunction
	 * @param member (Optional) Thumbnail field name to check. Default is 'thumbnail'
	 */
	public updateThumbnail(
		request,
		response,
		next,
		member: string = 'thumbnail'
	) {
		if ((this.isThumbnailUpdate(request), member)) {
			this.delete(request.payload[member]).catch(() => {});
		}

		next();
	}

	/**
	 * Middlware to delete thumbnail
	 * @param request Express Request
	 * @param response Express Response
	 * @param next Express NextFunction
	 * @param member (Optional) Thumbnail field name to check. Default is 'thumbnail'
	 */
	public deleteThumbnail(
		request,
		response,
		next,
		member: string = 'thumbnail'
	) {
		if (member in request.payload) {
			this.delete(request.payload[member]).catch(() => {});
		}

		next();
	}
}

export const cloud = new PointyCloudinary();
