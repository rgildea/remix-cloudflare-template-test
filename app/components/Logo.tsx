import { Link } from '@remix-run/react'
import { cn } from '#app/utils/misc.tsx'

const sizeClassName = {
	font: 'w-[1em] h-[1em]',
	xs: 'w-2 h-2',
	sm: 'w-4 h-4',
	md: 'w-8 h-8',
	default: 'w-12 h-12',
	lg: 'w-16 h-16',
	xl: 'w-24 h-24',
} as const

type Size = keyof typeof sizeClassName

// const childrenSizeClassName = {
// 	font: 'gap-1.5',
// 	xs: 'gap-1.5',
// 	sm: 'gap-1.5',
// 	md: 'gap-2',
// 	lg: 'gap-2',
// 	xl: 'gap-3',
// } satisfies Record<Size, string>

export default function Logo({
	className,
	size = 'default',
}: React.PropsWithChildren<{ className?: string; size: Size }>) {
	console.log('Size: ', size, sizeClassName[size])
	return (
		<div className={className}>
			<Link to="/" className="\tracking-tight flex flex-col font-nourd">
				<div className="text-3xl tracking-widest">Mixdown</div>

				<div className="flex text-nowrap align-middle font-light">
					<svg
						className={cn(sizeClassName[size], 'inline self-center', className)}
						fill="none"
						viewBox="0 0 87 100"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill="currentColor"
							d="M85.846687,49.3648695 L39.1453676,22.5140713 C39.1617713,34.917315 39.1617713,47.3236347 39.1617713,59.7299541 L39.1617713,62.0264714 C39.8035657,61.7230031 40.1900777,61.5692186 40.5489087,61.3631469 C42.5860423,60.1861818 44.5944698,58.9538544 46.6664617,57.8384031 C47.5307312,57.3790997 47.7798624,56.8100964 47.7747363,55.8812371 C47.7316765,50.2188868 47.7398783,44.5596121 47.7398783,38.8972616 C47.7398783,37.5767641 47.9223695,37.4711653 49.0521739,38.1211618 C55.4506404,41.7904631 61.8491065,45.4618153 68.2373205,49.1475203 C68.5910251,49.3484658 68.8729635,49.6714134 69.3240651,50.046648 C67.2120896,51.2964044 65.2713273,52.4672182 63.3121109,53.6000983 C57.0315463,57.2263401 50.7458554,60.8443802 44.4601648,64.4654959 C41.6387292,66.0904868 38.823445,67.7226545 36.0030346,69.353797 C35.0229138,69.9197244 34.690739,69.745435 34.690739,68.7089265 C34.6979157,53.5365341 34.6312757,38.3610657 34.778909,23.1907237 C34.7953127,21.3289043 34.3893212,20.1314346 33.2943746,19.1513138 C32.9160642,18.8047859 32.4516346,18.4931157 31.893909,18.1834958 C24.4425306,14.0692442 17.1264827,9.70688647 9.75097147,5.44705188 C6.80445763,3.73901728 3.84666646,2.05456279 0.885799526,0.36805797 C0.658198127,0.2419545 0.397789602,0.160961191 0,0 L0,100 C0.880673437,99.5140404 1.64549558,99.0998471 2.39698979,98.6702753 C4.13578145,97.6788772 5.850993,96.6556966 7.59901167,95.688904 C8.47660935,95.2029444 8.5432493,94.4237689 8.5432493,93.5697516 C8.53504745,83.0385795 8.52992136,72.5012558 8.5268456,61.9649576 C8.51864375,47.4599903 8.51351766,32.9539979 8.50531582,18.4500559 C8.50531582,17.584761 8.51351766,16.7225418 8.49813913,15.8633982 C8.48173544,14.9683716 8.86824744,14.9396651 9.51516822,15.3364296 C10.2881925,15.8039349 11.0499389,16.2960457 11.8557705,16.6958857 C12.6226432,17.0854734 12.9230358,17.6626785 12.9127837,18.495166 C12.8912539,20.0289115 12.9127837,21.5606066 12.9127837,23.0964024 C12.9127837,45.6986437 12.9076576,68.3029353 12.9209855,90.9051763 C12.9209855,91.3111678 13.1055271,91.7161341 13.2080502,92.1221255 C13.5996883,91.9980726 14.0261843,91.9447604 14.3757883,91.7458657 C16.3913922,90.6150359 18.3670122,89.4042382 20.4061965,88.3215944 C21.3514593,87.8192311 21.6467258,87.161033 21.6333978,86.1511806 C21.5954644,83.2046667 21.6272466,80.2530271 21.6272466,77.3065132 C21.6272466,61.069931 21.6272466,44.8364243 21.6221202,28.5998421 C21.6221202,26.948195 21.562657,25.2985985 21.549329,23.6469514 C21.5442029,23.2788934 21.6087923,22.9087851 21.6621043,22.303899 C23.1148565,23.1261341 24.3359066,23.7433232 25.4677615,24.5040445 C25.7927599,24.7244692 25.9947304,25.3549863 25.9947304,25.8009618 C26.0347142,34.0171623 26.0347142,42.2313126 26.0347142,50.4495637 C26.0295881,61.4913007 26.0213862,72.5412399 26.0183105,83.5891284 C26.0131844,84.6953526 26.2971733,84.8675914 27.2742186,84.310891 C31.3269564,81.9938691 35.3745681,79.6645444 39.413978,77.328043 C46.3414633,73.331693 53.2556207,69.3209896 60.1800306,65.327715 C68.3685501,60.6106276 76.5621957,55.8996914 84.7589168,51.1990076 C86.3111166,50.3070566 86.673023,49.9851342 85.846687,49.3648695 Z"
							id="Path"
						></path>
					</svg>
					<span className="leading-tightest flex text-nowrap text-body-xs font-light tracking-widest">
						Share your mixes
					</span>
				</div>
			</Link>
		</div>
	)
}
