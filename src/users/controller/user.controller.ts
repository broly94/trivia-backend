import { Request, Response } from 'express';
import config from '../../config/config';
import jwt from 'jsonwebtoken';

import { UserService } from '../services/user.service';

import { myDataSource } from '../../config/database';

/** Entities */
import { UserEntity } from '../../entities/user.entitiy';

export class UserController extends UserService {
	constructor() {
		/** Dependency injection */
		super(new UserEntity(), myDataSource.getRepository(UserEntity));
	}

	async getUsers(req: Request, res: Response) {
		try {
			const users = await this.getAllUsers();

			if (users == null) {
				throw new Error('Users not found');
			}

			return res.status(200).json({
				users,
				userLoging: req.user,
				error: false,
			});
		} catch (error) {
			res.status(400).json({
				message: `${error}`,
				error: true,
			});
		}
	}

	async getUser(req: Request, res: Response) {
		const { id } = req.params;

		try {
			const user = await this.getOneUser(id);
			if (user == null) {
				throw new Error('User not found');
			}
			return res.status(200).json({
				user,
				error: false,
			});
		} catch (error) {
			res.status(400).json({
				message: `${error}`,
				error: true,
			});
		}
	}

	async postUser(req: Request, res: Response) {
		const { name, email, password } = req.body;

		try {
			await this.registerUser(name, email, password);

			return res.json({
				message: 'User registration successful',
				error: false,
			});
		} catch (error) {
			const err = `${error}`;
			if (err.includes('Duplicate entry')) {
				res.status(400).json({
					message: 'The email or name are already in use',
					error: true,
				});
			} else {
				res.status(400).json({
					message: `${error}`,
					error: true,
				});
			}
		}
	}

	async updateUser(req: Request, res: Response) {
		const { id } = req.user;
		const { name } = req.body;

		try {
			const user = await this.changeDataUser(Number(id), name);

			if (user.affected == 0) {
				throw new Error('user could not update');
			}

			return res.status(200).json({
				message: 'User updated successfully',
				error: false,
			});
		} catch (error) {
			const err = `${error}`;
			if (err.includes('Duplicate entry')) {
				res.status(400).json({
					message: 'The name is already in use',
					error: true,
				});
			} else {
				res.status(400).json({
					message: `${error}`,
					error: true,
				});
			}
		}
	}

	async deleteUser(req: Request, res: Response) {
		const { id } = req.params;

		try {
			await this.eliminateUser(Number(id));

			return res.status(200).json({
				message: 'User deleted',
				error: false,
			});
		} catch (error) {
			res.status(400).json({ message: `${error}`, error: true });
		}
	}

	async getUsersRankByPoints(req: Request, res: Response) {
		try {
			const users = await this.getUsersRank();

			if (!users) {
				throw new Error('Users not found');
			}

			return res.status(200).json({
				users,
				error: false,
			});
		} catch (error) {
			res.status(400).json({ message: `${error}`, error: true });
		}
	}

	async getUserRankById(req: Request, res: Response) {
		const { id } = req.params;
		if (!id) {
			throw new Error('Invalid parameters');
		}
		try {
			const user = await this.getOneUserRankById(Number(id));
			if (!user) {
				throw new Error('User not found');
			}
			return res.status(200).json({
				user,
				error: false,
			});
		} catch (error) {
			res.status(400).json({ message: `${error}`, error: true });
		}
	}

	async changePassword(req: Request, res: Response) {
		const { password, newPassword } = req.body;
		const userLogin = req.user;
		try {
			const user = await this.setNewPassword(password, newPassword, userLogin);

			if (!user || user?.affected === 0) {
				throw new Error('The passwords do not match');
			}

			return res.json({
				message: 'Password changed successfully',
				error: false,
			});
		} catch (error) {
			res.status(400).json({ message: `${error}`, error: true });
		}
	}

	async setPointsUser(req: Request, res: Response) {
		const { id, points } = req.body;
		try {
			await this.setPoints(Number(id), Number(points));
			return res.status(200).json({
				message: 'Points updated successfully',
				error: false,
			});
		} catch (error) {
			res.status(400).json({ message: `${error}`, error: true });
		}
	}

	/** Forgot Password methods */

	async sendEmailForgotPassword(req: Request, res: Response) {
		try {
			const { email } = req.body;
			const { messageSuccess, link, messageError, token } = await this.forgotPassword(email);

			if (messageError) {
				throw new Error(messageError);
			}

			return res.status(200).json({
				messageSuccess,
				link,
				token,
				error: false,
			});
		} catch (error) {
			res.status(400).json({ message: `${error}`, error: true });
		}
	}

	async updateForgotPassword(req: Request, res: Response) {
		try {
			const resetToken = req.headers.token as string;
			const password = req.body.password;

			await this.createNewForgotPassword(password, resetToken);

			const isValid = jwt.verify(resetToken, config.jwt.jwtSecret);

			if (isValid == null) {
				throw new Error('The token is not valid');
			}

			return res.status(200).json({
				message: 'Reset password successfully',
				error: false,
			});
		} catch (error) {
			res.status(400).json({ message: `${error}`, error: true });
		}
	}

	async getUserTokenResetPassword(req: Request, res: Response) {
		const token = req.query.token as string;
		try {
			const userToken = await this.getTokenResetPassword(token);
			return res.status(200).json({
				token: userToken,
				error: false,
			});
		} catch (error) {
			res.status(400).json({ message: `${error}`, error: true });
		}
	}

	async deleteUserTokenResetPassword(req: Request, res: Response) {
		const token = req.query.token as string;
		try {
			await this.deleteTokenResetPassword(token);
			console.log('token deleted');
			return res.status(200).json({
				message: 'Delete token reset password successful',
				error: false,
			});
		} catch (error) {
			res.status(400).json({ message: `${error}`, error: true });
		}
	}
}
