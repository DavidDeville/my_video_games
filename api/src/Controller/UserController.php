<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Token;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserController extends AbstractController
{
    /**
     * Function to convert a json to an array
     *
     * @param object $request
     *
     * @return array $parametersAsArray - the parameters as array
     */
    public function jsonToArray(Request $request)
    {
        $parametersAsArray = [];
        if ($content = $request->getContent()) {
            $parametersAsArray = json_decode($content, true);
        }
        return $parametersAsArray;
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

        if (!empty($data->user->nickname) && !empty($data->user->email) && !empty($data->user->password)) {
            $entityManager = $this->getDoctrine()->getManager();
            $user_account = $entityManager->getRepository(User::class)->findOneBy(['email' => $data->user->email]);

            if ($user_account) {
                return $this->json(["message" => "fail"]);
            } else {
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
     * @Route("/user/login", methods={"POST"}, name="user_login")
     */
    public function login(Request $request, UserPasswordEncoderInterface $encoder)
    {
        // First, we get the values from the form sent by the user registration
        $formData = $request->getContent();
        $data = json_decode($formData);
        $entityManager = $this->getDoctrine()->getManager();
        $user = $entityManager->getRepository(User::class)->findOneBy(["email" => $data->user->email]);

        // comparaison avec le mdp envoyé et celui en bdd
        $match = $encoder->isPasswordValid($user, $data->user->password);
        
        if($match === true) {
            $token = new Token($user);
            $entityManager->persist($token);
            $entityManager->flush();
            return new JsonResponse(['success' => true, "token" => $token->getToken()]);
        }
        else {
            return new JsonResponse(['err' => "fdp :)"]);
        }
        // ob_start();
        // var_dump($match);
        // $contenu = $user->getNickname();
        // $contenu = ob_get_clean();
        
    }
}
