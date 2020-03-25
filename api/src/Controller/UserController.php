<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserController extends AbstractController
{
    /**
     * @Route("/user", name="user")
     */
    public function index()
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/UserController.php',
        ]);
    }

    /**
     * @Route("/user/register", methods={"POST"}, name="user_registration")
     */
    public function register(Request $request, UserPasswordEncoderInterface $encoder)
    {
        // First, we get the values from the form sent by the user registration
        $formData = $request->getContent();
        $data = json_decode($formData);
        $user = new User();
        
        if(!empty($data->user->nickname) && !empty($data->user->email) && !empty($data->user->password))
        {
            $entityManager = $this->getDoctrine()->getManager();
            $user_account = $entityManager->getRepository(User::class)->findOneBy(['email' => $data->user->email]);

            if($user_account) {
                return $this->json(["message" => "fail"]);
            }
            else {
                $hash = $encoder->encodePassword($user, $data->user->password);
                $user->setNickname($data->user->nickname)
                     ->setEmail($data->user->email)
                     ->setPassword($hash);
                $entityManager->persist($user);
                $entityManager->flush();
                return $this->json(["message" => "success"]);
            }   
        }
    }

    /**
     * @Route("user/login", methods={"POST}, name="user_login")
     */
    public function login() {
        
    }
}
