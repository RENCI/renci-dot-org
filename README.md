# renci-dot-org

## Project deployment overview
*Note that this diagram is for the entire project, while this repo represents the Next.js application exclusively.*
![image](https://github.com/mbwatson/renci-dot-org/assets/16181779/26d297d4-867d-4cdc-90b8-6ad3088a3b14)

This is a [Next.js](https://nextjs.org/) project. To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API access
In order to get data from the Strapi server at `api.renci.org`, you need to provide an API token as an environment variable to be used in the request `Authorization` header. For development, create a `.env` file in the root of the project.

```env
STRAPI_ACCESS_TOKEN=YOUR_API_TOKEN
```

## Deployment
<!-- This is  -->
<!-- This project contains a [Github Action workflow](./.github/workflows/build-image-and-push.yaml) to build and push the image to the [RENCI container registry](containers.renci.org) with a [Dockerfile](./Dockerfile). The script will automatically run on a new release, and the release name is used as the image tag. -->

First, decide the version number of your release using [semver](https://semver.org/). For this example, we will assume the version number is `1.1.4`. The latest image version number can be found in the [harbor repo](https://containers.renci.org/harbor/projects/34/repositories/frontend/artifacts-tab) and latest deployed image can be found by using this command:

```bash
kubectl get pods -n comms -o jsonpath="{.items[*].spec.containers[*].image}" -l app.kubernetes.io/name=renci-dot-org-frontend
```

In the root of the project, use this command to build the image:
```bash
docker build . -t containers.renci.org/renci-dot-org/frontend:1.1.4 \
  --build-arg VERSION=1.1.4 \
  --build-arg STRAPI_ACCESS_TOKEN=YOUR_ACCESS_TOKEN
```
> [!IMPORTANT]    
> If you are on an M-family Mac, you need to tell Docker to build for AMD64 architecture (used by Sterling) instead of ARM64 (Mac native instruction set). You can do this by setting this environment var before running `docker build`:
> `export DOCKER_DEFAULT_PLATFORM=linux/amd64`
> Be aware this will make the image take much longer to build as instructions have to be translated.

It's very important to note that the access token effectively gets embedded into the image, so the built image should be handled with care and only uploaded to the private RENCI container registry.

You should test that the image functions properly by running this command and then opening [http://localhost:3000](http://localhost:3000):
```bash
docker run -p 3000:3000 containers.renci.org/renci-dot-org/frontend:1.1.4
```

Once you have verified the image is working, push it to the registry with:
```bash
docker push containers.renci.org/renci-dot-org/frontend:1.1.4
```
> [!NOTE]
> If not already authenticated, log in with `docker login containers.renci.org`. See the RENCI wiki for more information

Once the new image has been pushed, update the deployment tag in the [kubernetes/values.yaml](/kubernetes/values.yaml) file. Now, that release can be upgraded in the kubernetes cluster with:
```bash
helm upgrade frontend ./kubernetes -n comms
```

Be sure to commit and push the image tag change made to `values.yaml`

### containers.renci.org access token
The GH action uses a [robot account token](https://goharbor.io/docs/1.10/working-with-projects/project-configuration/create-robot-accounts/) with permissions to create artifacts and tags. If you modify or update this account in Harbor, make sure to change the `USER` and `PW` in the Github secrets settings.

### Strapi API access token
For the deployed environment, the `ACCESS_TOKEN` environment variable is provided to the Next.JS container using a Secret called `renci-dot-org-api`, which has one variable called `token`. You can check if a secret already exists:

```bash
kubectl get secrets -n YOUR_NAMESPACE_HERE
```

Generate a new one if not:
```bash
kubectl create secret generic renci-dot-org-api \
  --from-literal=token=YOUR_API_TOKEN_HERE
```

If it already exists, you can update the secret by editing the `token` field in the yaml file:
```bash
kubectl edit secret renci-dot-org-api
```
Note that is it needs to be base64 encoded, so translate the token with `echo "YOUR_TOKEN" | base64` before copying it into the yaml file.
