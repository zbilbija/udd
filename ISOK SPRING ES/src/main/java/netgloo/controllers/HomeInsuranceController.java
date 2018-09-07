package netgloo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/homeInsurance")
@CrossOrigin("*")
public class HomeInsuranceController {

	
/*	@RequestMapping("/getHomeInsuranceData")
	@ResponseBody
	public List<HomeInsuranceView> getHomeInsuranceData() {
		
		//ime labele -- izvlaci se iz Risk
		//ponudjene mogucnosti --izvlaci se iz riskitem
		//cijena -- izvlaci se iz priceimpact na osnovu riskitem
		
		List<HomeInsuranceView> listForView = new ArrayList<HomeInsuranceView>();
		
		InsuranceCategory insuranceCategory = insuranceCategoryDao.findByCategoryName("HomeInsurance");
		List<InsuranceCategory_Risk> listInsCatRisk = insuranceCategoryRiskDao
				.findByInsuranceCategoryID(insuranceCategory.getId());
		
		
		List<Long> tempNumRisk = new ArrayList<Long>();
		
		for(InsuranceCategory_Risk icr : listInsCatRisk) {
			tempNumRisk.add(icr.getRiskID());
		}
		List<RiskItem> riskItemList = (List<RiskItem>) riskItemDao.findByRiskIDIn(tempNumRisk); //lista svih riskitem sa homecategory
		
		
		List<Long> tempRiskItemList = new ArrayList<Long>();
		for(RiskItem ri:riskItemList) {
			tempRiskItemList.add(ri.getId());
		}
		List<PriceImpacts> listPriceImpacts = (List<PriceImpacts>) priceImpactDao.findByRiskItemIdIn(tempRiskItemList);
		HomeInsuranceView homeInsV = null;
		for(Long l : tempNumRisk) {
			homeInsV = new HomeInsuranceView();
			homeInsV.setLabelName(riskDao.findOne(l).getRiskName()); //postavljanje labele
			
			List<HomeInsuranceOption> temp = new ArrayList<HomeInsuranceOption>();
			for(RiskItem ri:riskItemList) {
				
				HomeInsuranceOption hio = null;
				if(ri.getRiskID() == l) {
					hio = new HomeInsuranceOption();
					hio.setId(String.valueOf(ri.getId()));
					hio.setName(ri.getItemName());
					//JOS CIJENU IZVUCI u hio
					hio.setPrice(findByRiskItemID(listPriceImpacts,ri.getId()));
				}
				if(hio != null)
					temp.add(hio);
			}
			homeInsV.getOptionList().addAll(temp);
			listForView.add(homeInsV);
		}
		
		System.out.println(listForView);
		
		
		return listForView;
	}
	
	public double findByRiskItemID(List<PriceImpacts> listPriceImpacts, Long riskItemID) {
		double num = 0 ;
		for(PriceImpacts pi : listPriceImpacts) {
			if(pi.getRiskItemId() == riskItemID) {
				num = pi.getValue();
				break;
			}
		}
		return num;
	}

	@RequestMapping("/getAllInsuranceTypes")
	@ResponseBody
	public List<InsuranceType> getAllInsuranceTypes() {

		try {
			List<InsuranceType> listInsuranceTypes = (List<InsuranceType>) insuranceTypeDao.findAll();
			return listInsuranceTypes;
		} catch (Exception ex) {
			return null;
		}
	}
	
	@RequestMapping("/getAllHomeAges")
	@ResponseBody
	public List<HomeAge> getAllHomeAges() {

		try {
			List<HomeAge> listHomeAges = (List<HomeAge>) homeAgeDao.findAll();
			return listHomeAges;
		} catch (Exception ex) {
			return null;
		}
	}
	
	@RequestMapping("/getAllHomeOwners")
	@ResponseBody
	public List<HomeOwner> getAllHomeOwners() {

		try {
			List<HomeOwner> listHomeOwner = (List<HomeOwner>) homeOwnerDao.findAll();
			return listHomeOwner;
		} catch (Exception ex) {
			return null;
		}
	}
	
	@RequestMapping("/getAllHomeSurfaces")
	@ResponseBody
	public List<HomeSurface> getAllHomeSurfaces() {

		try {
			List<HomeSurface> listHomeSurface = (List<HomeSurface>) homeSurfaceDao.findAll();
			return listHomeSurface;
		} catch (Exception ex) {
			return null;
		}
	}
	
	@RequestMapping("/getAllHomeValues")
	@ResponseBody
	public List<HomeValue> getAllHomeValues() {

		try {
			List<HomeValue> listHomeValue = (List<HomeValue>) homeValueDao.findAll();
			return listHomeValue;
		} catch (Exception ex) {
			return null;
		}
	}
	
	/**
	**PRIVATE FIELDS
	*/
	
/*	@Autowired
	private InsuranceCategoryDao insuranceCategoryDao;
	
	@Autowired
	private InsuranceCategoryRiskDao insuranceCategoryRiskDao;
	
	@Autowired
	private PriceImpactDao priceImpactDao;
	
	@Autowired
	private PriceImpactPricelistDao priceImpactPricelistDao;
	
	@Autowired
	private PricelistDao pricelistDao;
	
	@Autowired
	private RiskDao riskDao;
	
	@Autowired
	private RiskItemDao riskItemDao;
	
	@Autowired
	private InsuranceTypeDAO insuranceTypeDao;
	
	@Autowired
	private HomeAgeDAO homeAgeDao;
	
	@Autowired
	private HomeOwnerDAO homeOwnerDao;
	
	@Autowired
	private HomeSurfaceDAO homeSurfaceDao;
	
	@Autowired
	private HomeValueDAO homeValueDao;
*/
}
