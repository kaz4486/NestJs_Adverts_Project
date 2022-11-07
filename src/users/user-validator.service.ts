import { Injectable } from '@nestjs/common';
import { UserRepository } from './db/users.repository';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';

@Injectable()
export class UserValidatorService {
  constructor(private userRepository: UserRepository) {}

  validateUniqueEmail(email: string): void {
    if (this.userRepository.getUserByEmail(email)) {
      console.log('validator' + email);
      throw new UserRequireUniqueEmailException();
    }
  }
}
